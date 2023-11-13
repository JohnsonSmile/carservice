/** @type {import('next').NextConfig} */

const nextConfig = {
   // output: "export",
   async rewrites () {
        return [
            {
                source: "/api/:path*",
                destination: "http://134.175.83.213:8081/api/:path*"
                // destination: "http://localhost:8080/api/:path*"
            },
        ]
    }
}

module.exports = nextConfig
