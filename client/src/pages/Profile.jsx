import Login from './Login'; 

const Profile = () => {
  return (
    <div>
        {/* Need User to be pulled from logged in user from backend */}
        <h1>Welcome, User!</h1>
        {/* Create Route for Post page off of button  */}
        <button>Create a Post!</button>
        {/* Create map function to pull dummy post data */}
        <div>
            <h4>This will be a post</h4>
        </div>
        {/* Create map function to associate replies with appropriate dummy post data */}
        <div>
            <h5>This will be reply #1</h5>
        </div>
        <div>
            <h5>This will be reply #2</h5>
        </div>
    </div>
  );
}


export default Profile;


