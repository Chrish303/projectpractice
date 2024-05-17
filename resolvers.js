const { PrismaClient } = require('@prisma/client');
const { parseInt } = require('lodash');
const prisma = new PrismaClient()

const resolvers = { 
    Query:{
        // FETCH the owner details;
        owners:async()=>{
           try{
            return await prisma.owner.findMany();
           }catch(error){
            console.error('Error to fetch owner')
            throw new Error('Failed to fetch owner')
           }
        },
        owner:async(_,{id})=>{
            try{
                return await prisma.owner.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to find data')
                throw new Error('Failed to find error')
            }
        },
        // FETCH the ompany details;
        companies : async()=>{
            try{
                return await prisma.company.findMany();
            }catch(error){
                console.error('Error to fetch company details',error);
                throw new Error('Failed to fetch error')
            }
        },
        company : async(_,{ id })=>{
            try{
                return await prisma.company.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to find company',error);
                throw new Error('Error to find company')
            }
        },
        // FETCH the Employeee
        employees:async()=>{
            try{
                return await prisma.employee.findMany();
            }catch(error){
                console.error('Error to fetch employeee',error);
                throw new Error('Failed to fetch employee')
        }

        },
        employee:async(_,{ id })=>{
            try{
                return await prisma.employee.findUnique({
                    where:{
                        id:parseInt(id)
                    }
                })
            }catch(error){
                console.error('Error to find employye',error);
                throw new Error('Failed to find employee')
            }
        },
        // FETCH the projects
        projects:async()=>{
            try{
                return await prisma.project.findMany();
            }catch(error){
                console.error('Error to FEtch project',error);
                throw new Error('Failed to fetch project')
        }
        },
        project:async(_,{id})=>{
            try{
                return await prisma.project.findUnique({
                    where:{id : parseInt(id)}
                })
            }catch(error){
                console.error('Error to find project',error);
                throw new Error('Failed to find project')
            }
        },
        // FETCH the profile
        profiles:async()=>{
            try{
                return await prisma.profile.findMany();
            }catch(error){
                console.error('Error to fetch profiles',error);
                throw new Error('Failed to fetch profiles')
            }
        },
        profile:async(_, { id })=>{
            try{
                return await prisma.profile.findUnique({
                    where:{id : parseInt(id)}
                })
            }catch(error){
                console.error('Error to find project',error);
                throw new Error('Failed to find project')
            }
        },
    },

    Mutation : {
        // Owner CURD operation
        createOwner:async(_,{name})=>{
            try{
                const createowner = await prisma.owner.create({
                    data:{
                        name
                    }
                });return createowner
            }catch(error){
                console.error('Error to create owner',error);
                throw new Error('Failed to create owner')
            }
        },
        updateOwner:async(_,{ id,name })=>{
            try{
                const updateOwner = await prisma.owner.update({
                    where:{
                        id:parseInt(id)
                    },
                    data:{
                        name:name
                    }
                });return updateOwner;
            }catch(error){
                console.error('Error to update owner',error)
                throw new Error("Failed to update owner")
            }
        },
        deleteOwner: async (_, { id }) => {
            try {
                const deletedOwner = await prisma.owner.delete({
                    where: {
                        id: parseInt(id)
                    }
                });
                return deletedOwner;
            } catch (error) {
                console.error('Error deleting owner:', error);
                throw new Error('Failed to delete owner');
            }
        },
        //  Company CURD operation
        createCompany: async (_, { name, ownerId }) => {
            try {
                const createCompany = await prisma.company.create({
                    data: {
                        name: name,
                        owner_id: parseInt(ownerId)
                    }
                });
                return createCompany;
            } catch (error) {
                console.error('Error creating company:', error);
                throw new Error('Failed to create company');
            }
        },
        updateCompany:async(_,{ id,name,ownerId})=>{
            try{
                const updateCompany = await prisma.company.update({
                    where:{
                        id : parseInt(id)
                    },
                    data:{
                        name:name,
                        owner_id:parseInt(ownerId)
                    }
                });return updateCompany;
            }catch(error){
                console.log('Error to Update company',error);
                throw new Error('Failed to update company')
            }
        },
        deleteCompany:async(_,{ id })=>{
            try{
                const deleteCompany = await prisma.company.delete({
                    where:{
                        id:parseInt(id)
                    }
                });return deleteCompany;
            }catch(error){
                console.error('Error to delete company',error)
                throw new Error('Failed to delete company')
            }
        },
        createEmployee: async (_, { name, phone, salary, companyId, projectId }) => {
            try {
                const createEmployee = await prisma.employeemployee.create({
                    data: {
                        name: name,
                        phone: phone,
                        salary: salary,
                        companyId: parseInt(companyId), // Correct field name
                        projectId: parseInt(projectId) // Correct field name
                    }
                });
                return createEmployee;
            } catch (error) {
                console.error('Error creating employee:', error);
                throw new Error('Failed to create employee');
            }
        },
        updateEmployee: async (_, { id, name, phone, salary, companyId, projectId }) => {
            try {
                const updatedEmployee = await prisma.employee.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: {
                        name: name,
                        phone: phone,
                        salary: salary,
                        companyId: parseInt(companyId),
                        projectId: parseInt(projectId)
                    }
                });
                return updatedEmployee;
            } catch (error) {
                console.error('Error updating employee:', error);
                throw new Error('Failed to update employee');
            }
        },     
        deleteEmployee:async(_,{ id })=>{
            try{
                const deleteEmployee = await prisma.employee.delete({
                    where:{
                        id:parseInt(id)
                    }
                });return deleteEmployee;
            }catch(error){
                console.error('Error to delete employee',error)
                throw new Error('Faild to delete')
            }   
        },
        createProject: async (_, { name, type, estematedAmount, companyId }) => {
            try {
                const createProject = await prisma.project.create({
                    data: {
                        name: name,
                        type: type,
                        estematedAmount: estematedAmount,
                        companyId:parseInt(companyId),
                    }
                });
                return createProject;
            } catch (error) {
                console.error('Error creating project:', error);
                throw new Error('Failed to create project');
            }
        },
        updateProject:async(_,{id,name,type,estematedAmount,companyId})=>{
            try{
                const updateProject = await prisma.project.update({
                    where:{
                        id:parseInt(id)
                    },
                    data:{
                        name: name,
                        type: type,
                        estematedAmount: estematedAmount,
                        companyId:parseInt(companyId),
                    }
                });return updateProject;
            }catch(error){
                console.error('Error to update project',error)
                throw new Error('Failed to update project')
            }
        },
        deleteProject:async(_,{id})=>{
            try{
                const deleteProject = await prisma.project.delete({
                    where:{id:parseInt(id)}
                });return deleteProject
            }catch(error){
                console.error('Error to delete project',error);
                throw new Error('Failed to delete project')
            }
        },
        createProfile:async(_,{ image, email, emergencyContact, bloodGroup, dateOfBirth,employeeId })=>{
            try{
                const createProfile = await prisma.profile.create({
                    data:{
                        image:image,
                        email:email,
                        emergencyContact,
                        bloodGroup:bloodGroup,
                        dateOfBirth:dateOfBirth,
                        employeeId:parseInt(employeeId)
                    }
                });return createProfile
            }catch(error){
                console.error('Error to create profile',error);
                throw new Error('Failed to create profile')
            }
        },
        updateProfile:async(_,{id, image, email, bloodGroup, dateOfBirth, emergencyContact, employeeId})=>{
            try{
                const updateProfile = await prisma.profile.update({
                    where:{id:parseInt(id)},
                    data:{
                        image:image,
                        email:email,
                        emergencyContact:emergencyContact,
                        bloodGroup:bloodGroup,
                        dateOfBirth:dateOfBirth,
                        employeeId:parseInt(employeeId)
                    }
                });return updateProfile;
            }catch(error){
                console.error('Error to update profile',error);
                throw new Error('Failed to update profile')
            }
        },
        deleteProfile:async(_,{ id })=>{
            try{
                const deleteProfile = await prisma.profile.delete({
                    where:{id:parseInt(id)}
                });return deleteProfile
            }catch(error){
                console.error('Error to delete profile',error);
                throw new Error('Failed to delete profile')
            }
        },
},
        Owner:{
            companies:async(parent)=>{
                try{
                    return await prisma.company.findMany({
                        where:{
                            owner_id:parent.id
                        }
                    })
                }catch(error){
                    console.error
                    throw new Error('Failed to owener companies')
                }
            },   
        },
        Company: {
            owner: async (parent) => {
              try {
                return await prisma.owner.findUnique({
                  where: {
                    id: parent.owner_id,
                  },
                });
              } catch (error) {
                console.error('Failed to retrieve owner details:', error);
                throw new Error('Failed to retrieve owner details');
              }
            },
            employees: async ( parent ) => {
              try {
                return await prisma.employee.findMany({
                  where: {
                    companyId: parent.id,
                  },
                });
              } catch (error) {
                console.error('Failed to retrieve employee details:', error);
                throw new Error('Failed to retrieve employee details');
              }
            },
            projects: async (parent) => {
              try {
                return await prisma.project.findMany({
                  where: { companyId: parent.id },
                });
              } catch (error) {
                console.error('Failed to retrieve project details:', error);
                throw new Error('Failed to retrieve project details');
              }
            },
        },
        Employee: {
            company: async (parent) => {
              try {
                return await prisma.company.findUnique({
                  where: {
                    id: parent.companyId,
                  },
                });
              } catch (error) {
                console.error('Failed to retrieve company details:', error);
                throw new Error('Failed to retrieve company details');
              }
            },
            project: async (parent) => {
              try {
                return await prisma.project.findUnique({
                  where: {
                    id: parent.projectId,
                  },
                });
              } catch (error) {
                console.error('Failed to retrieve project details:', error);
                throw new Error('Failed to retrieve project details');
              }
            },
            profile: async (parent) => {
              try {
                return await prisma.profile.findUnique({
                  where: {
                    employeeId: parent.id,
                  },
                });
              } catch (error) {
                console.error('Failed to retrieve profile details:', error);
                throw new Error('Failed to retrieve profile details');
              }
            },
          },
          Project:{
            company:async(parent)=>{
                try{
                    return await prisma.company.findUnique({
                        where:{
                            id:parent.companyId
                        }
                    })
                }catch(error){
                    console.error('Failed to retrive the comany details')
                    throw new Error('Failed to retrive the comany details')
                }
            },
           employees:async(parent)=>{
            try{
                return await prisma.employee.findMany({
                    where:{
                           projectId:parent.id 
                    }
                })
            }catch(error){
                console.error('Failed to retrive the employee details')
                throw new Error('Failed to retrive the employee details')
            }
           }
          },
          
    }


module.exports =  resolvers, prisma ;
