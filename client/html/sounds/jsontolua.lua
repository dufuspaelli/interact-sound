local JSON = require("JSON") --The JSON library
function printTable(t, f)

    local function printTableHelper(obj, cnt)
 
       local cnt = cnt or 0
 
       if type(obj) == "table" then
 
          io.write("\n", string.rep("\t", cnt), "{\n")
          cnt = cnt + 1
 
          for k,v in pairs(obj) do
 
             if type(k) == "string" then
                io.write(string.rep("\t",cnt), '["'..k..'"]', ' = ')
             end
 
             if type(k) == "number" then
                io.write(string.rep("\t",cnt), "["..k.."]", " = ")
             end
 
             printTableHelper(v, cnt)
             io.write(",\n")
          end
 
          cnt = cnt-1
          io.write(string.rep("\t", cnt), "}")
 
       elseif type(obj) == "string" then
          io.write(string.format("%q", obj))
 
       else
          io.write(tostring(obj))
       end 
    end
 
    if f == nil then
       printTableHelper(t)
    else
       io.output(f)
       io.write("return")
       printTableHelper(t)
       io.output(io.stdout)
    end
end
local soundData = require("soundfilename")

local source = "sounds.json"
local destination = "output.lua"

local f = io.open(source)
local data = f:read("*all")

--print(soundData)

--local data = soundData

--Now after executing the file.lua script, the data has been stored in the global table Settings.

--Encode into JSON data.
local jsonData = JSON:decode(data)

printTable(jsonData, "output.lua")
--[[ --Open the destination file for writing.
local file = assert(io.open(destination, "w"))

--Write the JSON data.
assert(file:write(jsonData))

--Close the file.
file:close() ]]

print("Wrote file.json successfully!")
