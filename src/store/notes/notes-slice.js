import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import noteAPI from "../../api";
import axios from "axios";
const BASE_URL = "http://localhost:3200/notes";

const initialState = {
    notes: [],
    status: 'idle',
    error: null
}

const fetchAll = createAsyncThunk(
    'notes/fetchAll',
    async () => {
      const response = await axios.get(`${BASE_URL}`)
    //   console.log(response.data)
      return response.data
    }
)

const createNote = createAsyncThunk(
    'notes/create',
    async (formValues) => {
        const response = await axios.post(`${BASE_URL}`, formValues)
        return response.data
    }
)

// =================== Delete by ID ===================================================

const deleteNote_by_Id = createAsyncThunk(
    'notes/delete',
    async (id) => {
        const response = await axios.delete(`${BASE_URL}/${id}`)
        return id;
        // dispatch(fetchAll())
    }
)

// ====================================================================================

// =================== Update by ID ===================================================

const updateNote_get_by_Id = createAsyncThunk(
    'notes/get_id',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data;
    })

const updateNote_by_Id = createAsyncThunk(
    'notes/update',
    async (id) => {
        const response = await axios.put(`${BASE_URL}/${id}`)
        return response.data;
    })



// ====================================================================================


export const noteSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {},
  extraReducers: {

    [fetchAll.pending]: (state, action) => {
        state.status = 'loading'
    },
    [fetchAll.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        state.notes = action.payload
    },
    [fetchAll.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    },
    [updateNote_get_by_Id.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        state.notes = action.payload
        state.error = null
    },


    // Delete ucun Slice By ID
    [deleteNote_by_Id.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        state.notes = state.notes.filter(note => note.id !== action.payload)
    },
  }
});

export { fetchAll, createNote, deleteNote_by_Id, updateNote_by_Id, updateNote_get_by_Id}
export const noteReducer = noteSlice.reducer;