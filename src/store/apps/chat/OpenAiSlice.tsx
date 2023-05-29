import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiClient from '../../../client/axios'

type State = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

const initialState: State = {
  status: 'idle',
  error: null
}
export type OpenAiResponse = {
    content : string
    id : number
}

// Thunk
export const getChatResponse = createAsyncThunk(
  'chat/getChatResponse',
  async (prompt: string, { rejectWithValue }) => {
    console.log('prompt: ', prompt);
    
    try {
      const response = await apiClient.post<OpenAiResponse>('/openai/chat', { prompt })

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
const chatResponseSlice = createSlice({
  name:  'chat/getChatResponse',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getChatResponse.pending, state => {
        state.status = 'loading'
      })
      .addCase(getChatResponse.fulfilled, (state, action) => {
        state.status = 'succeeded'

      })
      .addCase(getChatResponse.rejected, (state, action) => {
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

export default chatResponseSlice.reducer
