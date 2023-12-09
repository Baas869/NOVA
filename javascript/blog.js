const StorageCtrl = (() =>{

    return{
        setLocalStorage: (comment)=>{
            let posts;
            if(localStorage.getItem('posts') === null){
                posts = [];
                posts.push(comment)
                localStorage.setItem('posts', JSON.stringify(posts))
            }else{
                posts = JSON.parse(localStorage.getItem('posts'));
                posts.push(comment);

                localStorage.setItem('posts', JSON.stringify(posts))
            }
        },
        getPostFromLocalStorage: () =>{
            let posts;
            if(localStorage.getItem('posts') === null){
                posts = []
            }else{
                posts = JSON.parse(localStorage.getItem('posts'));
            }
            return posts;
        }
    }
})();
const BlogCtrl = (() =>{
    const User = function(id, name, comment, date) {
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.date = date;
    }
    const dateFormarts = () =>{
        let objectDate = new Date();
        let day = String(objectDate.getDay()).padStart(2, '0');
        let month = objectDate.toLocaleString('defult', {month: 'long'});
        let year = objectDate.getFullYear();

        let date = `${day} ${month},${year}`;
        return date;
    }
    
    const blog = {
        users: [
            // {id:0, name: 'Baas', comment: 'Hello, I\'m baas', date: dateFormarts()},
            // {id:1, name: 'Sulaiman', comment: 'Hello, I\'m Sulaimn', date: dateFormarts()},
            // {id:2, name: 'Omowumi', comment: 'Hello, I\'m Omowumi', date: dateFormarts()}
        ],
        users: StorageCtrl.getPostFromLocalStorage(),
        currentState: null
    }
   
    return{
        getItems: ()=>{
            return blog.users;
        },
        logData: () =>{
            return blog.users
        },
        addComments: (name, comment) =>{
           let Id;

           if(blog.users.length > 0){
            Id = blog.users[blog.users.length - 1].id + 1;
           }else{
            Id = 0;
           }
           const date = dateFormarts();
           
           const newUser = new User(Id, name, comment, date);

           blog.users.push(newUser);
           return newUser;
        },
        // get: (url) =>{
        //     // fetch('https://api.chucknorris.io/jokes/random').then((res) => res.json()).then((data) => {
        //     //     return data;
        //     // })
        //     return new Promise((resolve, reject) =>{
        //         fetch(url)
        //         .then((res) => res.json()).then((data) => resolve(data))
        //         .catch((err) => reject(err));
        //     })
        // }
    }
})();



const UICtrl = (() =>{
    const userSelector = {
        userName: '#name',
        userEmail: '#email',
        userComment: '#comment',
        userWebsite: '#website',
        submitBtn: '.submit-btn'
    }
    const getRandomNumber = () =>{
        let min = 1,
            max = 100;
        return Math.floor(Math.random()*(max-min+1));
    }
    


    return{
        populatePost: (users) =>{
            
            users.forEach((user) =>{
                const commentContainer = document.querySelector('.comments');
                const replyForm = document.querySelector('.reply-form');
                const comments = document.createElement('div');
                comments.className = 'comment';
                comments.id = `comment-${user.id}`;
                const dFlexDiv = document.createElement('div');
                dFlexDiv.className = 'd-flex';
                dFlexDiv.innerHTML = `
                    <div class="comment-img"><img src="https://randomuser.me/api/portraits/men/${user.id + 1}.jpg" alt=""></div>
                    <div class="comment-info">
                        <h5><a href="">${user.name}</a> <a href="#reply-form" class="reply"><i class="fa-solid fa-reply"></i> Reply</a></h5>
                        <time datetime="2020-01-01">${user.date}</time>
                        <p>${user.comment}</p>
                    </div>
                `
                comments.appendChild(dFlexDiv);
                commentContainer.insertBefore(comments, replyForm);
            })
            
        },
        getComments: () =>{
            return{
                name: document.querySelector(userSelector.userName),
                email: document.querySelector(userSelector.userEmail),
                comment: document.querySelector(userSelector.userComment),
                website: document.querySelector(userSelector.userWebsite)
            }
        },
        showComment: (user) =>{
            const userImg = getRandomNumber();
            const commentContainer = document.querySelector('.comments');
            const replyForm = document.querySelector('.reply-form');
            const comments = document.createElement('div');
            comments.className = 'comment';
            comments.id = `comment-${user.id}`;
            const dFlexDiv = document.createElement('div');
            dFlexDiv.className = 'd-flex';
            dFlexDiv.innerHTML = `
                <div class="comment-img"><img src="https://randomuser.me/api/portraits/men/${user.id + 1}.jpg" alt=""></div>
                <div class="comment-info">
                    <h5><a href="">${user.name}</a> <a href="#reply-form" class="reply"><i class="fa-solid fa-reply"></i> Reply</a></h5>
                    <time datetime="2020-01-01">${user.date}</time>
                    <p>${user.comment}</p>
                </div>
            `
            comments.appendChild(dFlexDiv);
            commentContainer.insertBefore(comments, replyForm);
            
        },
        // showAlert: (message, className) =>{
        //     clearAlert();
        //     const divAlert = document.createElement('div')
        //     divAlert.className = 'alert', className;
        //     divAlert.append(document.createTextNode(message));
        //     setTimeout(() =>{
        //         clearAlert();
        //     }, 3000)
        // },
        // clearAlert: () =>{
        //     const currentAlert = document.querySelector('.alert');
        //     if(currentAlert){
        //         remove(currentAlert);
        //     }
        // },
        clearInputs: () =>{
            document.querySelector(userSelector.userName).value = '',
            document.querySelector(userSelector.userEmail).value = '',
            document.querySelector(userSelector.userComment).value = '',
            document.querySelector(userSelector.userWebsite).value = ''
        },
        userSelector: () =>{
            return userSelector;   
        }

    }
})();


const BlogAppCtrl = ((BlogCtrl, StorageCtrl, UICtrl) =>{
    //Initialize blog selectors
    const selector = UICtrl.userSelector();

    const user = UICtrl.getComments();

    const loadEventListeners = () =>{
        document.querySelector(selector.submitBtn).addEventListener('click', submitComments);
    }
    const submitComments = (e) =>{
        if(user.name.value !== '' && user.email.value !== '' && user.comment.value !== ''){
            const userComment = BlogCtrl.addComments(user.name.value, user.comment.value);
            
            // console.log(jokes)
            UICtrl.showComment(userComment);
            StorageCtrl.setLocalStorage(userComment);
            UICtrl.clearInputs();
            // UICtrl.showAlert('You reply has been sent', success);
        }else{
            e.preventDefault();
            return;
        }
        

        e.preventDefault();
    }

    return{
        init: () =>{
            const posts = BlogCtrl.getItems()

            loadEventListeners();
            // localStorage.clear()
            
            UICtrl.populatePost(posts);
            
            // const joke = BlogCtrl.get('https://api.chucknorris.io/jokes/random').then((data) => console.log(data.value))

        }
    }
})(BlogCtrl, StorageCtrl, UICtrl);

BlogAppCtrl.init();
