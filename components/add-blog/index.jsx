import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const AddBlog = ({ openBlogDialog, setOpenBlogDialog, loading, setBlogFormData, blogFormData, handleSaveBlogData, currentEditedBlogID, setCurrentEditedBlogID }) => {
    return (
        <>
            <div className='flex justify-end'>
                <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>
            <Dialog
                open={openBlogDialog}
                onOpenChange={() => {
                    setOpenBlogDialog(false)
                    setBlogFormData({
                        title: "",
                        description: ""
                    })
                    setCurrentEditedBlogID(null)
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {currentEditedBlogID ? "Edit Blog" : "Add New Blog"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <Label htmlFor="title" >Title</Label>
                        <Input name="title" placeholder="Enter a Title" value={blogFormData?.title} onChange={(event) => setBlogFormData({ ...blogFormData, title: event.target.value })} />
                    </div>
                    <div className="mt-5">
                        <Label htmlFor="description" >Description</Label>
                        <Input name="description" placeholder="Enter a Description" value={blogFormData?.description} onChange={(event) => setBlogFormData({ ...blogFormData, description: event.target.value })} />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveBlogData} type='button'>
                            {loading ? "Saving changes" : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddBlog