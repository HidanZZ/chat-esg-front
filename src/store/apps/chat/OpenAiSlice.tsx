
import { combineReducers } from '@reduxjs/toolkit'
import ChatCompletion from './components/ChatCompletion'
import FrequentQuestions from './components/FrequentQuestions'
import chatpdf from './components/Chatpdf'


export default combineReducers({
  ChatCompletion,
  FrequentQuestions,
  chatpdf
})