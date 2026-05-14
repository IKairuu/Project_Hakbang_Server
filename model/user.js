class User
{
    constructor(name, email, password_hash, avatar, occupation, institution, grade, role, about_me)
    {
        this.name = name ;
        this.email = email ;
        this.password_hash = password_hash ;
        this.avatar = avatar ;
        this.occupation = occupation ;
        this.institution = institution ;
        this.grade = grade ;
        this.role = role ;
        this.about_me = about_me ;
    }
}

export default User ;