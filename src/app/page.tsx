"use client"

import  {useRouter}  from "next/navigation";
import BooksUI from "./components/BooksUI";

export default function HomePage() {
  const route= useRouter()
  return (
    <> 
  
       <div
       className="min-h-screen bg-cover bg-center"
       style={{
         backgroundImage: "url('/istockphoto-png.jpg')" // Replace with your image URL
       }}   >
    <div className="flex justify-center items-center h-20" onClick={()=>route.push('/api/books')}>
  <button className="px-4 py-2 bg-black text-white rounded hover:bg-black  border-4 border-black">
    Go to Books API
  </button>
</div>
      <BooksUI/>
      </div>
    </>
  );
}