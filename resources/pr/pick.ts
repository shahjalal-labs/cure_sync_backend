//
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  age: 30,
  isActive: true,
};

const pickedUser = pick();

