import {useState} from 'react'

export default function useToggle(){

    const [open, setOpen] = useState(false)

    const handleToggle = () => setOpen(!open)
    const forceOpen = () => setOpen(true)
    const forceClose = () => setOpen(false)

    return [open, handleToggle, forceOpen, forceClose]

}