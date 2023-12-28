import { useState } from 'react';
import  styles from './message_box.module.css';

function MessageBox({message}) {
    return (
     <span>{message}</span>
    );
  }
  
  export default MessageBox;