require "http/client"

module Session
  class GoogleOAuth
    struct AccessToken
      include JSON::Serializable
      getter id_token : String
    end

    struct IdToken
      include JSON::Serializable

      getter email : String
      getter name : String
      getter hd : String
    end

    def initialize(@client_id : String, @client_secret : String, @redirect_url : String, @domain : String)
    end

    def authentication_url(state : String) : String
      params = URI::Params.encode({
        access_type: "online",
        client_id: @client_id,
        hd: @domain,
        redirect_uri: @redirect_url,
        response_type: "code",
        scope: "openid profile email",
        state: state,
      })
      "https://accounts.google.com/o/oauth2/auth?#{params}"
    end

    def validate(params : Frost::Params, state : String?) : Bool
      params.route["provider"] == "google" &&
        params.query["state"] == state &&
        params.query["hd"] == @domain
    end

    def authorize(code : String) : IdToken?
      body = URI::Params.encode({
        client_id: @client_id,
        client_secret: @client_secret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: @redirect_url,
      })
      headers = HTTP::Headers{"Content-Type" => "application/x-www-form-urlencoded"}
      response = HTTP::Client.post("https://oauth2.googleapis.com/token", body: body, headers: headers)

      if response.success?
        jwt = AccessToken.from_json(response.body).id_token.split('.')
        profile = IdToken.from_json(Base64.decode_string(jwt[1]))
        profile if profile.hd == @domain
      end
    end
  end
end
