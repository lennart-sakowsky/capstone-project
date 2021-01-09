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
        var_dump($requestedToken);

        if (!$requestedToken)
            {
                return null;
            }

        $foundToken = $this->tokenRepository->findOneBy([
            'value' => $requestedToken
        ]);
        var_dump($foundToken);

        if (!$foundToken)
            {
                return null;
            }
        
        $user = $foundToken->getUser();
        $now = new \DateTime();
        
        if ($foundToken->getValidUntil() < $now)
            {
                return null;
            }

        return $user;
    }
}
