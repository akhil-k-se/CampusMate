import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Hostel from '../hostelModel/Hostel'

const About = () => {
    return (
        <div>
            <div class="py-16">
                <div class="container mx-auto text-center">
                    <h1 class="text-4xl font-bold mb-4">Welcome to <span className='text-pink-500'>CampusMate</span></h1>
                    <p class="text-gray-600 max-w-2xl mx-auto">Your home away from home, providing comfortable and secure accommodation for students since 2024.</p>
                </div>
            </div>

            <div class="container mx-auto py-12 px-4">
                <div class="mb-16">
                    <h2 class="mb-2 text-xl">OUR STORY <span className='text-pink-500'>-</span></h2>
                    <h1 className='font-semibold text-3xl'>How we Started ?</h1>
                    <div class="flex justify-around items-center">
                        <div className='w-1/2'>
                            <p class="text-gray-600 mb-4">Founded in 2024, CampusMate has been providing quality accommodation to students from across the country. We understand the importance of a comfortable and conducive environment for academic success.</p>
                            <p class="text-gray-600">Our mission is to create a safe, inclusive, and supportive community where students can thrive both academically and personally.</p>
                        </div>
                        <div className="w-[600px] h-[300px]">
                            <Canvas id="canvas-container" className="w-full h-full ">
                                <OrbitControls
                                    enableRotate={true}
                                    enablePan
                                    enableZoom={false}
                                />
                                <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                                <Hostel scale={0.9} position={[0, -5, 0]} />
                                <ambientLight intensity={1} />
                                <directionalLight intensity={1} position={[10, 10, 10]} />
                            </Canvas>
                        </div>
                    </div>
                </div>

                <div class="mb-16">
                    <h2 class="mb-2 text-xl">WHY CHOOSE US <span className='text-pink-500'>-</span></h2>
                    <h1 className='font-semibold text-3xl'>What makes us different from others ?</h1>
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-pink-600 mb-4">Safe & Secure</h3>
                            <p class="text-gray-600">24/7 security, CCTV surveillance, and controlled access to ensure your safety.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-pink-600 mb-4">Modern Facilities</h3>
                            <p class="text-gray-600">Well-equipped rooms, high-speed internet, study areas, and recreational spaces.</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-pink-600 mb-4">Support Staff</h3>
                            <p class="text-gray-600">Dedicated team available 24/7 to assist with your needs and concerns.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 class="mb-2 text-xl">OUR TEAM <span className='text-pink-500'>-</span></h2>
                    <h1 className='font-semibold text-3xl mb-5'>Meet our team members</h1>
                    <div class="grid md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                                <img src="/api/placeholder/128/128" alt="Team Member" class="w-full h-full object-cover rounded-full" />
                            </div>
                            <h3 class="font-semibold text-pink-600">Akashdeep Singla</h3>
                        </div>
                        <div class="text-center">
                            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                                <img src="/api/placeholder/128/128" alt="Team Member" class="w-full h-full object-cover rounded-full" />
                            </div>
                            <h3 class="font-semibold text-pink-600">Akhil Kumar</h3>
                        </div>
                        <div class="text-center">
                            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4">
                                <img src="/api/placeholder/128/128" alt="Team Member" class="w-full h-full object-cover rounded-full" />
                            </div>
                            <h3 class="font-semibold text-pink-600">Aryan Suri</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
