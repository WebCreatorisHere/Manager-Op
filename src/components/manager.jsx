import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
// import { useRef } from 'react'
const manager = () => {
    const ref = useRef()
    const iref = useRef()
    const [form, setform] = useState({ site: "", user: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {

        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])

    const showpassword = () => {

        if (ref.current.src.includes("icons/eyeoff.png")) {
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/eyeoff.png"
        }
        if (iref.current.type == "password") {
            iref.current.type = "text"
        }
        else {
            iref.current.type = "password"
        }

    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleadd = () => {
        
            if (form.site.length > 3 && form.user.length > 3 && form.password.length > 3) {
                toast('🦄 Password Saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
                setform({ site: "", user: "", password: "" })
            }
            else {
                toast("🦄 Password not saved")
            }
        
    }
    const handledelete = (id) => {
        let c = confirm("Do you want to delete it ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    const handleedit = (id) => {

        setform(passwordArray.filter((i) => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const itemcopy = (text) => {
        toast('🦄 Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="mycontainer mb-5 mx-auto mt-1 max-w-5xl max-md:px-2 min-h-[78.2vh]">
                <div className="text flex justify-center items-center flex-col"><h1 className='font-bold text-4xl  text-black p-4'><span className='text-green-600'>&lt;</span>Pass<span className='text-green-600'>OP&gt;</span></h1>
                    <p className='text-black font-semibold px-4'>Your Own Password Manager</p>
                </div>
                <div className='flex text-black flex-col p-4'>

                    <div className='flex gap-2'> <h2 className='font-bold max-md:hidden text-black text-xl'>Website:</h2><input value={form.site} onChange={handlechange} className='w-full bg-slate-700 rounded-full text-white max-md:text-sm outline-none border-2 border-green-600 px-3 font-medium' type="text" name="site" id="i" placeholder='eg - www.google.com' /></div>

                    <div className="flex gap-3 my-6 max-md:mt-3 justify-between max-md:flex-col">
                        <div className='flex gap-2 w-1/2 max-md:w-full'><h2 className='font-bold max-md:hidden text-black text-xl'>Username:</h2> <input onChange={handlechange} value={form.user} className='bg-slate-700 rounded-full text-white max-md:text-sm outline-none border-2 border-green-600 px-3 font-medium w-full' type="text" name="user" id="d" placeholder='Enter your Username' /></div>
                        <div className='flex gap-2 w-1/2 max-md:w-full relative'><h2 className='font-bold max-md:hidden text-black text-xl'>Password:</h2> <input onChange={handlechange} ref={iref} value={form.password} className='bg-slate-700 max-md:text-sm text-white rounded-full outline-none border-2 border-green-600 px-3 font-medium w-full' type="password" name="password" id="e" placeholder='Enter your Password' />
                            <span className='absolute right-2 top-0.5 cursor-pointer' onClick={showpassword}>
                                <img ref={ref} width={26} src="icons/eyeoff.png" alt="" /></span></div>
                    </div>

                    <button onClick={handleadd} className='flex items-center mx-auto justify-center bg-green-500 hover:bg-green-600 rounded-full gap-1 w-fit px-4 py-1.5 font-bold'><lord-icon

                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        fill="white"
                    >
                    </lord-icon>Add Password</button>

                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl '>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='font-medium rounded-md text-lg mt-2'>No passwords to show!!</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto mt-4 w-full rounded-xl overflow-hidden">
                            <thead className='bg-green-400 font-bold text-md'>
                                <tr>
                                    <th className='py-1 text-xl'>Website</th>
                                    <th className='py-1 text-xl'>Username</th>
                                    <th className='py-1 text-xl'>Password</th>
                                    <th className='py-1 text-xl'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item) => {
                                    return <tr>
                                        <td className='text-center py-1 w-[40%]'>
                                            <div className='itemcopy flex items-center justify-center gap-1'>
                                                <a href={item.site}>{item.site}</a>
                                                <div className='flex cursor-pointer' onClick={() => { itemcopy(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-1'>
                                            <div className='itemcopy flex items-center justify-center gap-1'>
                                                <span>{item.user}</span>
                                                <div className='flex cursor-pointer' onClick={() => { itemcopy(item.user) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-1'>
                                            <div className='itemcopy flex items-center justify-center gap-1'>
                                                <span>{item.password}</span>
                                                <div className='flex cursor-pointer' onClick={() => { itemcopy(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2'>
                                            <span className='cursor-pointer' onClick={() => { handleedit(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>

                                            <span className='cursor-pointer' onClick={() => { handledelete(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default manager