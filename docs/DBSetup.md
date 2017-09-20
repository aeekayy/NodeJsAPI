sequelize model:create --name Company --attributes company_name:string,description:string,phone_number:string,email_verified:date,active:boolean,deleted:boolean

sequelize model:create --name StageSpace --attributes stage_name:string,description:string,rate_per_hour:float,fix_rate:float:stage_hours:integer,packages:array,contrast:string,height:float,height_to_grid:float,width:float,depth:float,sq_ft:float,schematic:string,location:geometry,active:boolean,deleted:boolean

