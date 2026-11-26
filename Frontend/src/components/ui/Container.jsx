const Container = ({ children, className = '' }) => {
  return <div className={`container-max section-padding ${className}`}>{children}</div>
}

export default Container
