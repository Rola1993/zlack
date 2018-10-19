@channels.each do |channel|
   json.set! channel.id do
     json.extract! channel, :id, :user_ids, :name, :is_dm
   end
 end
