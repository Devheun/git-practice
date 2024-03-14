import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./entity/user.entity";

@Injectable()
export class UserRepository extends Repository<User>{
    private userRepository : Repository<User>;

    constructor(private readonly dataSource : DataSource){
        super(User, dataSource.createEntityManager());
    }
}