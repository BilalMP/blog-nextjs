"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import AddBlog from "../add-blog"
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"

const initialBlogFormData = {
    title: "",
    description: ""
}

const Blog = ({ blogsList }) => {
    const [openBlogDialog, setOpenBlogDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [blogFormData, setBlogFormData] = useState(initialBlogFormData)
    const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null)

    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [])

    const handleEdit = ( blog ) => {
        setCurrentEditedBlogID(blog?.id)
        setBlogFormData({
            title: blog?.title,
            description: blog?.description
        })
        setOpenBlogDialog(true)
    }

    const handleDelete = async (id) => {
        try {
            const apiResponse = await fetch(`http://localhost:3000/api/delete-blog?id=${id}`, {
                method: "DELETE"
            })
            const result = await apiResponse.json()
            if (result?.status === 200) {
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveBlogData = async () => {
        try {
            setLoading(true)
            const apiResponse = currentEditedBlogID !== null ? await fetch(`http://localhost:3000/api/update-blog?id=${currentEditedBlogID}`, {
                method: "PUT",
                body: JSON.stringify(blogFormData)
            }) : await fetch("http://localhost:3000/api/create-blog", {
                method: "POST",
                body: JSON.stringify(blogFormData)
            })
            const result = await apiResponse.json()
            if (result?.status === 200) {
                setBlogFormData(initialBlogFormData)
                setOpenBlogDialog(false)
                setLoading(false)
                setCurrentEditedBlogID(null)
                router.refresh()
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setOpenBlogDialog(false)
            setBlogFormData(initialBlogFormData)
        }
    }

    return (
        <div className="min-h-screen flex flex-col gap-10 p-6">
            <AddBlog
                openBlogDialog={openBlogDialog}
                setOpenBlogDialog={setOpenBlogDialog}
                loading={loading}
                setLoading={setLoading}
                blogFormData={blogFormData}
                setBlogFormData={setBlogFormData}
                handleSaveBlogData={handleSaveBlogData}
                currentEditedBlogID={currentEditedBlogID}
                setCurrentEditedBlogID={setCurrentEditedBlogID}
            />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogsList && blogsList.length > 0 ? (
                        blogsList?.map(blog => (
                            <Card key={blog.id}>
                                <CardHeader>
                                    <CardTitle>{blog.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{blog.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={() => handleEdit(blog)}>Edit</Button>
                                    <Button onClick={() => handleDelete(blog.id)}>Delete</Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <Label className='mt-10 text-md font-light'>
                            No Blog found! Please add one
                        </Label>
                    )
                }
            </div>
        </div>
    )
}

export default Blog