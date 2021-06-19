# IDs attributes serialized as a single string
module Mongoid
  module Document
    def as_json(options = {})
      attrs = super(options)
      attrs.keys
           .reject { |k| (/_id$/ =~ k).nil? }
           .each { |k| attrs[k] = attrs[k]['$oid'].to_s }
      attrs
    end
  end
end
