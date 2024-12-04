import classNames from "classnames/bind";
import styles from './DefaultLayout.module.css';
import NavBar from '../NavBar.jsx';
const clx = classNames.bind(styles);

function DefaultLayout({children}){
    return (
        <div className={clx('wrapper')}>    
            <NavBar />
            <div className={clx('content')}>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout;