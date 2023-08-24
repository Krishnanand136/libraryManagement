import noPicAvailable from "../../images/noPicAvailable.jpeg"
const imageContainer = ({ className, ...rest}) => {
    const defaultClassName = `ImageContainer ${className ? className : ''}`
    return (
        <div className={defaultClassName}>
            <img
                src={rest.src || noPicAvailable} 
                height={rest.height || 150}
                width={ rest.width || 150}
            />
        </div>
    )
}

export default imageContainer