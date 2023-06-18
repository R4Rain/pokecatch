'use client'
import { createContext, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    type: '',
    message: ''
  });
  const [open, setOpen] = useState(false);

  return (
    <AlertContext.Provider value={{ setOpen, setAlert }}>
      <div className='z-50 fixed bottom-4 left-4 min-w-[15%] max-w-lg-[25%] max-w-md-[50%]'>
        <Alert
        variant="gradient"
        color={(alert.type === 'failed') ? 'red' : 'green'}
        open={open}
        onClose={() => setOpen(false)}
        > 
            <Typography className="font-medium">
                { alert.message }
            </Typography>
        </Alert>
      </div>
      { children }
    </AlertContext.Provider>
  )
}

export default AlertProvider;