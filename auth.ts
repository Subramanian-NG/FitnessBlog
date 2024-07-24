import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import clientPromise from "./app/utils/dbconnect";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async session({ session, token }) {
          //("session data--",session);
          const client = await clientPromise;
          const db = client.db();

          // Fetch user data from MongoDB using email
          const user = await db.collection("users").findOne({ email: session.user.email });

          if (user) {
            session.user.id = user._id.toString();
          }
          return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
          // Call handleDBadd after sign-in
          const session = { user };
          await handleDBadd(session);
          return true;
        },
      },
      
})

const handleDBadd = async (session) => {
  if (session) {
    const users = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
      }),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    if (users != null) {
      console.log("User created");
    }
  }
};