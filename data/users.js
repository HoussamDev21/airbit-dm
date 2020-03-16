let data = [
    {
        id: 1,
        name: 'John Doe',
        avatar: 'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg'
    },
    {
        id: 2,
        name: 'Michael Wong',
        avatar: 'https://pbs.twimg.com/profile_images/652875667416219648/NY9hnAbp.jpg'
    },
    {
        id: 3,
        name: 'Gus Fring',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        id: 4,
        name: 'Walter White',
        avatar: 'https://pbs.twimg.com/profile_images/1060388713010741248/bUkmHPKs.jpg'
    },
    {
        id: 5,
        name: 'Glen Rouse',
        avatar: 'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?h=350&auto=compress&cs=tinysrgb'
    },
    {
        id: 6,
        name: 'Lara Thayer',
        avatar: 'https://images.unsplash.com/photo-1476493279419-b785d41e38d8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=61eaea85f1aa3d065400179c78163f15'
    },
]

data.get = function (id) {
    return this.find(u => u.id === id)
}

export default data