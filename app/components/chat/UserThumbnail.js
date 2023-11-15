import Image from 'next/image'

export default function UserThumbnail({
  isLoading,
  className,
  image,
  alt,
  children,
}) {
  return (
    <div
      className={`w-14 h-14 bg-gray-300 rounded-full relative overflow-hidden ${className} ${
        isLoading && 'animate-pulse'
      }`}
    >
      {!isLoading && (
        <img
          src={image}
          alt={alt}
          className="w-14 h-14 object-cover object-top"
        />
      )}
      {children}
    </div>
  )
}
