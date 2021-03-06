<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Request;
use App\Repository\TokenRepository;
use App\Entity\User;

class AuthenticationService {
    private $tokenRepository;

    public function __construct(TokenRepository $tokenRepository) {
        $this->tokenRepository = $tokenRepository;
    }

    public function isValid(Request $request): ?User {
        $authHeader = $request->headers->get('Authorization');
        $bearerToken = substr($authHeader, strpos($authHeader, ' ')+1);

        if ($bearerToken === false) {
            return null;
        }

        $token = $this->tokenRepository->findOneBy([
            'value' => $bearerToken
        ]);

        if (is_null($token)) {
            var_dump('Token not found');
            return null;
        }
        
        $user = $token->getUser();
        
        date_default_timezone_set('Europe/Berlin');
        $now = new \DateTime();
        
        if ($token->getValidUntil() < $now) {
            return null;
        }

        return $user;
    }

    public function deleteOldToken(object $user): void {
        $tokens = $user->getTokens();
        foreach ($tokens as $token) {
            $this->tokenRepository->delete($token);
        }
    }
}
