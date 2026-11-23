# cityhall

# Géneration direct de la clé par node

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Hash des refresh token

node -e "console.log(require('crypto').createHash('sha256').update('test').digest('hex'))"
