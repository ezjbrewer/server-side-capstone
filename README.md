### Super Sandwich Makers README Documentation

### About

Super Sandwich Makers is a full-stack ordering based app. Aiming to design to streamline the process of ordering and the best user-experience, this app's purpose is to be the center of operations for the pseudo-restaurant.

### Goals
- Tailor towards user experience
- Achieve full CRUD mechanics

### Technolgies Used:
- JavaScript
- ReactJS
- HTML
- CSS
- C#
- .NET
- SQL

### Setup

- Run `dotnet restore` to install dependencies
- Initialize user secrets `dotnet user-secrets init`
- Save your connection string (replace <your password> with your Postgres password):
	`dotnet user-secrets set SandwichDbConnectionString "Host=localhost;Port=5432;Username=postgres;Password=<your password>;Database=Sandwich"`
- Save app's admin password to "password":
	`dotnet user-secrets set AdminPassword password`
- Create the database migration:
	`dotnet ef migrations add InitialCreate`
- Create the database:
	`dotnet ef database update`
- In the `client` directory, run `npm install`
- Start the C# debugger to run the REST API
- In the `client` directory, run `npm run dev`

### To Log In

- Find the admin email in the DbContext file
- Enter the email in the login page
- Enter the password: "password"
