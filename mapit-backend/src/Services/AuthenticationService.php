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
        $requestedToken = substr($authHeader, strpos($authHeader, ' ')+1);

        if (!$requestedToken) {
                return null;
        }

        $foundToken = $this->tokenRepository->findOneBy([
            'value' => $requestedToken
        ]);

        if (!$foundToken) {
            return null;
        }
        
        $user = $foundToken->getUser();
        
        date_default_timezone_set('Europe/Berlin');
        $now = new \DateTime();
        
        if ($foundToken->getValidUntil() < $now) {
                return null;
        }

        return $user;
    }

    public function deleteOldToken(object $user): void {
        $tokens = $user->getTokens();
        date_default_timezone_set('Europe/Berlin');
        $now = new \DateTime();

        foreach ($tokens as $token)
        {
            if ($token->getValidUntil() < $now) {
                $this->tokenRepository->delete($token);
            }
        }
    }
}