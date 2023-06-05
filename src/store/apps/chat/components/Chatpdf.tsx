import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiClient from '../../../../client/axios'

type State = {
    history: [string | null, string | null,sourceDocument[] | null][]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null | undefined | { [key: string]: string[] }
}

export type Payload = {
  question: string
  history: [string | null, string | null][]
}

const initialState: State = {
    history : [
        [null,'Hello there! I am a bot that can answer your questions about the PDF.',null],
    ],
  status: 'idle',
  error: null
}
export type OpenAiResponse = {
    text:string
    sourceDocuments : sourceDocument[]
}

export type sourceDocument = {
    pageContent : string
    metadata : {
        'loc.pageNumber' : number
        source : string
    }
}

// Thunk
export const getChatResponse = createAsyncThunk(
  'chat/getChatResponse',
  async (payload :Payload, { rejectWithValue ,dispatch,getState}) => {
    
    try {
        dispatch(addHistory([payload.question,null,null]))


      const response = await apiClient.post<OpenAiResponse>('/openai/chatpdf', payload)

        dispatch(addHistoryResponse(response.data))

        

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
const ChatCompletionSlice = createSlice({
  name:  'chat/getChatResponse',
  initialState,
  reducers: {
    addHistory: (state, action) => {
        state.history.push(action.payload);
        },
        addHistoryResponse: (state, action) => {
            state.history[state.history.length-1][1] = action.payload.text
            state.history[state.history.length-1][2] = action.payload.sourceDocuments
            }
  },
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

export const {addHistory,addHistoryResponse} = ChatCompletionSlice.actions

export default ChatCompletionSlice.reducer
