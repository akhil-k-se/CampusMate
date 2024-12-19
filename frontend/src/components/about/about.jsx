import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Hostel from "../hostelModel/Hostel";

const About = () => {
  return (
    <div>
      <div class="py-16">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">
            Welcome to <span className="text-[#a48152]">CampusMate</span>
          </h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Your home away from home, providing comfortable and secure
            accommodation for students since 2024.
          </p>
        </div>
      </div>

      <div class="container mx-auto py-12 px-4">
        <div class="mb-16">
          <h2 class="mb-2 text-xl">
            OUR STORY <span className="text-[#a48152]">-</span>
          </h2>
          <h1 className="font-semibold text-3xl">How we Started ?</h1>
          <div class="flex justify-around items-center">
            <div className="w-1/2">
              <p class="text-gray-600 mb-4">
                Founded in 2024, CampusMate has been providing quality
                accommodation to students from across the country. We understand
                the importance of a comfortable and conducive environment for
                academic success.
              </p>
              <p class="text-gray-600">
                Our mission is to create a safe, inclusive, and supportive
                community where students can thrive both academically and
                personally.
              </p>
            </div>
            <div className="w-[600px] h-[300px]">
              {/* <Canvas id="canvas-container" className="w-full h-full">
                <OrbitControls
                  enableRotate={true}
                  enablePan={true}
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                  rotateSpeed={1}
                />
                <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                <Hostel scale={0.75} position={[0, -5, 0]} />
                <ambientLight intensity={1} />
                <directionalLight intensity={1} position={[10, 10, 10]} />
              </Canvas> */}
              <img src="/about.jpg" alt="About Us" />
            </div>
          </div>
        </div>

        <div class="mb-16">
          <h2 class="mb-2 text-xl">
            WHY CHOOSE US <span className="text-[#a48152]">-</span>
          </h2>
          <h1 className="font-semibold text-3xl">
            What makes us different from others ?
          </h1>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold text-[#a48152] mb-4">
                Safe & Secure
              </h3>
              <p class="text-gray-600">
                24/7 security, CCTV surveillance, and controlled access to
                ensure your safety.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold text-[#a48152] mb-4">
                Modern Facilities
              </h3>
              <p class="text-gray-600">
                Well-equipped rooms, high-speed internet, study areas, and
                recreational spaces.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold text-[#a48152] mb-4">
                Support Staff
              </h3>
              <p class="text-gray-600">
                Dedicated team available 24/7 to assist with your needs and
                concerns.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 class="mb-2 text-xl">
            OUR TEAM <span className="text-[#a48152]">-</span>
          </h2>
          <h1 className="font-semibold text-3xl mb-5">Meet our team members</h1>
          <div class="grid md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                <img
                  src="https://imgs.search.brave.com/D2nL0SVkp3oXxJsSk3eTT7y3I6ZYESo7OUaZyvHU7Fo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcHJvZmlsZS1p/Y29uLW1hbGUtYXZh/dGFyXzQ4MzY5LTIx/MTcuanBnP3NlbXQ9/YWlzX2h5YnJpZA"
                  alt="Team Member"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 class="font-semibold text-[#a48152]">Akashdeep Singla</h3>
            </div>
            <div class="text-center">
              <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                <img
                  src="https://imgs.search.brave.com/JI6kCA_dFEhdRv6RbRDK_zEg4qM9lg70511SMRCBJV0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFuLXByb2Zp/bGVfMTA4MzU0OC0x/NTk2My5qcGc_c2Vt/dD1haXNfaHlicmlk"
                  alt="Team Member"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 class="font-semibold text-[#a48152]">Akhil Kumar</h3>
            </div>
            <div class="text-center">
              <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                <img
                  src="https://imgs.search.brave.com/GzZdvgp1t5tSlTOf6GD-Bda2_8C3rL-1zo4vRd4LgbU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvcGVvcGxlLXBy/b2ZpbGUtaWNvbl8y/NDg3Ny00MDc2MC5q/cGc_c2VtdD1haXNf/aHlicmlk"
                  alt="Team Member"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 class="font-semibold text-[#a48152]">Aryan Suri</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
