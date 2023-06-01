import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiClient from '../../../../client/axios'

type State = {
    questions:string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}



const initialState: State = {
    questions : [],
  status: 'idle',
  error: null
}


// Thunk
export const getFrequentQuestions = createAsyncThunk(
  'chat/getFrequentQuestions',
  async ( test:string,{ rejectWithValue }) => {
    
    try {
        console.log('getFrequentQuestions',test);
        
      const response = await apiClient.get<string[]>('/openai/frequent-questions')

      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

// Slice
const FrequentQuestionsSlice = createSlice({
  name:  'chat/getFrequentQuestions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFrequentQuestions.pending, state => {
        state.status = 'loading'
      })
      .addCase(getFrequentQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log('getFrequentQuestions',action.payload);
        
        state.questions = action.payload

      })
      .addCase(getFrequentQuestions.rejected, (state, action) => {
        state.status = 'failed'
        if (action.payload) {
          // If a payload is available, it means we have a response from the server
          //@ts-ignore
          state.error = action.payload
        } else {
          // Otherwise, we only have an error message
          state.error = action.error.message
        }
      })
  }
})

export default FrequentQuestionsSlice.reducer
