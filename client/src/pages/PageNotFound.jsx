import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <div>
        <h1>PAGE NOT FOUND!</h1>

        <Link to='/'>Go back to home</Link>
    </div>
  )
}

export default PageNotFound