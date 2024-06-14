
const Post = require('../models/post');

const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({
            title : title,
            content :content,
            author : req.user.id,
            file : req.file ? req.file.path : null,
            status : req.body.status || 'active',
            
        });
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, status } = req.body;
    try {
        let post = await Post.findById(id);
       
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
            }
            if (post.author.toString() !== req.user.id) {
                return res.status(403).json({ msg: 'User not authorized' });
            }
    
        //Yalnızca yeni değer sağlandığında güncelleme işlemi yapacak şekilde değiştirildi
        if (title) post.title = title;
        if (content) post.content = content;
        if (status) post.status = status;
        if(req.file){
            post.file=req.file.path;
        }
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post || post.author.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        await post.deleteOne({_id:id});
        res.json({ msg: 'Post removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' ,error:err.message});
    }
};
const getPosts =async (req,res)=>{
    try{
        const posts =await Post.find({status:'active'}).populate('author',['name']);
        if(!posts.length){
            return res.status(404).json({msg:'No posts found'});
        }
        res.json(posts);
    }catch(err){
        res.status(500).json({msg:'Server Error',error:err.message});
    }
};


const getPost = async (req, res) => {
    try {
       // const posts = await Post.find({ status: 'active' }).populate('author', ['name']);
        //getPosts un önceki islevinde tüm gonderileri listeliyorduk goruntulenme sayısını da
         // ayrıca tutacagımız icin goruntulenme sayısını arttırmak icin tek bir gönderiyi ID degerine gore getiren yontem ile yaptım
        const post = await Post.findById(req.params.id).populate('author',['name']);

        if(!post){
            return res.status(404).json({msg:'Post not found'});
        }
        post.views +=1;
        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

module.exports = { createPost, updatePost, deletePost, getPosts ,getPost};
