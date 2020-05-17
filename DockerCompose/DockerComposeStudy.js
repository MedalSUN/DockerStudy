/* 
    1:docker compose,是一个编排服务，它可以让用户在集群上部署分布式应用
    2:通过docker compose用户可以很容易的用一个配置文件定义一个多容器的应用，
      然后使用一条指令安装这个应用的所有依赖并完成构建；
    3:配置文件在docker-compose.yml文件中（YAML是专门用来写配置文件的语言）
    4:compose中有两个概念
        1:服务  一个应用的容器，一个实例，在demo中web服务和postgres服务是两个创建出来的镜像，也是两个服务
        2:项目  是由一组相关联的应用容器组成的完整业务单元  这个项目是在docker-compose.yml中定义的

    5:一个项目可以由多个服务（容器）关联成，但是compose是面向项目进行管理的而不是服务
	==

    
    
    version: '3'          
    services:                                    接下来列出所有的服务
        web:                                     web服务器（node-server）
            build: ./node-server                 创建web镜像的文件夹为node-server
            ports:
            - '5000:5000'                        端口，将镜像容器中的端口5000映射到host宿主机的5000端口中
            depends_on:                          服务依赖
            - postgres                              依赖于postgres服务
            environment:                         设定环境变量
            NODE_ENV: development
            restart: unless-stopped              重启的参数
        postgres:
            build: ./postgres
            volumes:
            - "/var/lib/postgresql/data"
            # - ./data/:/var/lib/postgresql/data
            restart: unless-stopped
            ports:
            - "5432:5432"
            environment:
            PGDATA: /var/lib/postgresql/data/pgdata
            POSTGRES_PASSWORD: postgres
            POSTGRES_USER: postgres

*/



/* 
                    depends_on
        服务依赖：   这里根据文档说明                          https://docs.docker.com/compose/compose-file/
        理解：
            depends_on只是依赖关系，但是并没有说明先后关系   
            即：设置depends_on只是说我启动web服务就必须要启动postgres服务

            但是在这里，数据库没有启动起来，web服务启动起来会报错
            必须要   controllong startup order   控制开启的顺序   https://docs.docker.com/compose/startup-order/
            wait-for-it.sh文件 包含在相应的应用程序镜像中，轮询给定的主机和端口，一直到他接受TCP连接

            猜测： wait.for-it.sh放在web服务的镜像中，轮询等到postgres的端口开放，再接收TCP连接

            wait-for-it.sh文件：https://github.com/vishnubob/wait-for-it





*/



