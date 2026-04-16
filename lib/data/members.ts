export interface Member {
  id: string;
  name: string;
  title: string;
  position: string;
  occupation: string;
  location: string;
  bio: string;
  photo: string;
  social?: {
    email?: string;
    phone?: string;
  };
}

export const members: Member[] = [
  {
    id: "1",
    name: "Engr. Matthew A. Chukwu",
    title: "",
    position: "Chairman",
    occupation: "Cardiologist",
    location: "Enugu, Nigeria",
    bio: "Engr Matthew Chukwu is a distinguished...",
    photo: '/matthew-okafor.jpg',
    social: { email: "email@matthewchukwu.com" },
  },
 
  
];
