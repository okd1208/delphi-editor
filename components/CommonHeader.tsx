import Image from "next/image";

export default function CommonHeader() {
  return(
    <div className="header flex items-center mb-8 ml-24">
      <Image src="/logo.png" alt="Delphi Editor logo" width={100} height={100} />
      <div className="ml-4 text-3xl font-extrabold text-gray-800">Delphi Editor</div>
    </div>
  );
}
