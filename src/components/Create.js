import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

const Create = () => {


    const [title, setTitle]= useState('')
    const [body, setBody]= useState('')
    const [files, setFiles]= useState('')
    const [author, setAuthor]= useState('soomi')
    const [isPending, setIsPending]=useState(false)
    const [error, setError]=useState(null)
    const navigate= useNavigate()

    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ]
    };
    

    const handelSubmit=(e)=>{
        
        e.preventDefault()
        // const blog={ title, body, author }
        const data= new FormData()
        data.set('title',title)
        data.set('body',body)
        data.set('title',title)
        data.set('file',files[0])
        
        setIsPending(true)      
        axios.post('http://localhost:3001/create',data)
        .then((res)=>{      
            setIsPending(false)
            navigate('/')
        })
        .catch((err)=>{
           setError(err.message)
        })
    }

    useEffect(()=>{

        axios.get('http://localhost:3001/check-user',{withCredentials:true})
        .then((res)=>{
            if(res.data.loggedIn===false){
                navigate('/login')
            }
        })
        .catch((err)=>{
           setError(err.message)
        })

    },[])

    
    return ( 
        <div className="create">
            <h2>Add new Blog</h2>
            <form onSubmit={handelSubmit}>
                <label> Blog Title:</label>
                <input type="text" required 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />

                <input type="file"  name="" id=""
                onChange={(e)=>setFiles(e.target.files)}
                 />

                <label> Blog body:</label>
                <ReactQuill value={body}
                onChange={ newValue=>setBody(newValue)} 
                modules={modules}
                />
                <label >Author</label>
                <select
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
                 >
                    <option value="khan">Khan</option>
                    <option value="soomi">Soomi</option>
                </select>
                {error && <p>{error}</p>}
                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Loading</button>}
            </form>
        </div>
     );
}
 
export default Create;