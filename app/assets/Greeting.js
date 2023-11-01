import Image from "next/image";

export default function Greeting() {
  return (
    <Image
      src="/greeting.gif"
      alt=""
      width={200}
      height={200}
      priority={true}
    />
  );
}
