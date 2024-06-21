// Display company info

import { Card } from "reactstrap"
import "./Information.css"

// Show programmer info -> THAT'S YOU!

export const ContactUs = ({loggedInUser}) => {
    return(
        <div className="info-container">
            <Card className="info-card">
                <h2 className="info-header">Company</h2>
                <div>
                    <p>Phone Number: +1-818-695-5000</p>
                    <p>Email: sandwichbros@maker.comx</p>
                    <p>Address: 123 Sandwich Rd, Wichsand, SW</p>
                </div>
            </Card>
            <Card className="info-card">
                <h2 className="info-header">Programmer</h2>
                <div>
                    <p>Ezra Brewer</p>
                    <p>GitHub: <a href="https://github.com/ezjbrewer"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'grey' }}>
                            Profile
                        </a>
                    </p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/ezra-brewer"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'grey' }}>
                            Projects
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    )
}