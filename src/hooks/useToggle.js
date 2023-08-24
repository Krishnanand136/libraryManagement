import {useState} from 'react'

export default function useToggle(){

    const [open, setOpen] = useState(false)

    const handleToggle = () => setOpen(!open)

    return [open, handleToggle]

}