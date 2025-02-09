-- Base64 character set
local b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

-- Build a reverse lookup table for Base64 decoding
local b64lookup = {}
for i = 1, #b64chars do
    b64lookup[b64chars:sub(i, i)] = i - 1
end

-- Function to decode a Base64 string
local function decode_base64(base64_str)
    local padding = base64_str:sub(-2) == '==' and 2 or (base64_str:sub(-1) == '=' and 1 or 0)
    local decoded = {}
    local bits = 0
    local buffer = 0

    for i = 1, #base64_str do
        local char = base64_str:sub(i, i)
        if char ~= '=' then
            buffer = (buffer << 6) | b64lookup[char]
            bits = bits + 6
            if bits >= 8 then
                bits = bits - 8
                decoded[#decoded + 1] = string.char((buffer >> bits) & 0xFF)
            end
        end
    end

    return table.concat(decoded):sub(1, #decoded - padding)
end

-- Function to save the decoded data as an image file
local function base64_to_image(base64_str, output_file)
    local decoded_data = decode_base64(base64_str)
    local file = io.open(output_file, "wb")
    if not file then
        error("Unable to open file: " .. output_file)
    end
    file:write(decoded_data)
    file:close()
    print("Image saved to: " .. output_file)
end



---@param data table
---@param data.quality? number
---@param data.type? 'jpeg' | 'png' | 'webp'
---@return string 

local takeScreenshot = function(ply, data)
  lib.print.info('Taking screenshot...')
  local ret = lib.callback.await('clean_screenshot:takeScreenshot', 2, data)
  print('Screenshot URL: ', json.encode(ret, { indent = true }))
  return ret
end

exports('takeScreenshot', takeScreenshot)

RegisterCommand('screenshot', function(source, args)
  if src == 0 and not args[1] then
    lib.print.error('You must provide a player ID to take a screenshot of.')
    return
  end
  local ret = takeScreenshot(source or args[1], {
    quality = 100,
    type = 'png'
  })
  print('Screenshot URL: ', json.encode(ret, { indent = true }))
  local output_file = "output_image.png"
base64_to_image(ret.url, output_file)

end)