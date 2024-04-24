import Image from "next/image";
import Link from "next/link";

const mockUrls = [
  "https://images.unsplash.com/photo-1543424165-dc50e710c481?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzY2xlJTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1623550995311-252fe7df3817?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bXVzY2xlJTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1571203483902-4ee1555f0777?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzY2xlJTIwY2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1506610654-064fbba4780c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2NsZSUyMGNhcnN8ZW58MHx8MHx8fDA%3D"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-wrap gap-4 ml-6">
        {
          [...mockImages, ...mockImages, ...mockImages].map((image) => (
            <div key={image.id} className="w-48">
              <Image src={image.url} alt="carslol" width={480} height={80}/>
            </div>
          ))
        }
      </div>
    </main>
  );
}
