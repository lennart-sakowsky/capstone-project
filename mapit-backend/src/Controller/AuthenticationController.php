<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\TokenSerializer;
use App\Serializer\UserDataSerializer;
use App\Repository\UserRepository;
use App\Repository\TokenRepository;
use App\Entity\User;
use App\Entity\Token;
use App\Services\AuthenticationService;


class AuthenticationController extends AbstractController
{
    /**
     * @Route("/login", methods={"POST"})
     */
    public function token(
        Request $request, 
        TokenSerializer $tokenSerializer,
        UserRepository $userRepository,
        TokenRepository $tokenRepository,
        AuthenticationService $authenticationService
        ): JsonResponse {
        $post = json_decode($request->getContent(), true);
        $user = $userRepository->login($post['email'], $post['password']);
    
        if (is_null($user)) {
            return $this->json(['success' => false], JsonResponse::HTTP_UNAUTHORIZED);
        };

        $authenticationService->deleteOldToken($user);

        $token = $tokenRepository->create($user);
        
        return new JsonResponse(
            $tokenSerializer->serialize($token),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
    
    /**
     * @Route("/logout", methods={"DELETE"})
     */

    public function deleteToken(
        Request $request,
        TokenRepository $tokenRepository,
        TokenSerializer $tokenSerializer
    ): JsonResponse {
        $authHeader = $request->headers->get('Authorization');
        $receivedToken = substr($authHeader, strpos($authHeader, ' ')+1);

        $token = $tokenRepository->findOneBy(
            [
                'value' => $receivedToken
            ]
        );

        if (is_null($token)) {
            return $this->json(['error' => 'Token not found.'], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        date_default_timezone_set('Europe/Berlin');
        $now = new \DateTime();
        if ($token->getValidUntil() < $now) {
            $tokenRepository->delete($token);
            return $this->json(['error' => 'Session has expired.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        
        $tokenRepository->delete($token);

        return new JsonResponse(
            json_encode(['success' => 'Successfully logged out of application.']),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}