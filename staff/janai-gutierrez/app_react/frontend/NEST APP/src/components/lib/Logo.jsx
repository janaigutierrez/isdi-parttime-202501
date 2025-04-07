import logoLarge from '../../assets/logoBig.png' 
import logoSmall from '../../assets/logoSmall.png'

const Logo = ({ variant = 'large', onClick }) => {
    const logoSrc = variant === 'small' ? logoSmall : logoLarge

    return (
        <img
            src={logoSrc}
            alt="Logo"
            className="logo"
            onClick={onClick}
        />
    )
}

export default Logo
