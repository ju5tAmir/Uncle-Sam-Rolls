#!/bin/bash
dotnet ef dbcontext scaffold \
 "Server=localhost;Database=testdb;User Id=testuser;Password=testpass;" \
 Npgsql.EntityFrameworkCore.PostgreSQL \
 --output-dir ../Domain/Entities \
 --context-dir . \
 --context UncleSamContext  \
 --no-onconfiguring \
 --data-annotations \
 --force