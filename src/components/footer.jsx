import { useState } from "react"
import "./footer.css"
import emailjs from "emailjs-com"
import bg from "./footer_images/footer_bg_opacity80.png"
import { Link } from "react-router-dom"

function Footer() {
  const [Form, setForm] = useState({
    userName: "",
    email: "",
    textArea: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send("service_dm01xpf", "template_9qiz7fi",
        {
          userName: Form.userName,
          email: Form.email,
          textArea: Form.textArea
        },"-dByRhoNhCwL5wpA1" 
      )
      .then(
        (result) => {
          console.log(result.text)
          alert("Thanks for your Suggestion " + Form.userName)
          setForm({
            userName: "",
            email: "",
            textArea: ""
          })
        },
        (error)=>{
          console.log(error.text)
          alert("Failed to send, please try again.")
        }
      )
  }

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="backGround container-fluid row p-4">
      <form className="col-sd-12 col-md-6" onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label htmlFor="name" className="form-label fs-3">Name</label>
          <input
            type="text"
            className=" w-75 form-control bg-secondary"
            id="name"
            name="userName"
            value={Form.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label fs-3">Email</label>
          <input
            type="email"
            className=" w-75 form-control bg-secondary"
            id="email"
            name="email"
            value={Form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text-area" className="form-label fs-3">Suggestions</label>
          <textarea
            className="w-75 form-control fs-3 bg-secondary"
            id="text-area"
            rows="3"
            name="textArea"
            value={Form.textArea}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>

      <div className="col-md-6 col-sd-12 text-center lh-lg">
        <ul className="navbar-nav fs-3">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/TVseries">TV Series</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Favourites">Favourites</Link>
          </li>
        </ul>
      </div>

      {/* <div className="col-4 text-center lh-lg">
        <ul className="navbar-nav fs-3">
          <li className="nav-item">
            <Link className="nav-link" to="/AboutUs">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Terms">Terms and Services</Link>
          </li>
        </ul>
      </div> */}
    </div>
  )
}

export default Footer
