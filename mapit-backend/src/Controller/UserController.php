<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use App\Serializer\UserSerializer;
use App\Repository\TokenRepository;
use App\Serializer\TokenSerializer;
use App\Services\AuthenticationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/user", methods={"POST"})
     */
    public function register(
        Request $request, 
        UserRepository $userRepository, 
        UserSerializer $userSerializer,
        TokenRepository $tokenRepository,
        TokenSerializer $tokenSerializer
        ): JsonResponse {
    
            $user = $userSerializer->deserialize($request->getContent());
            $emailExists = $userRepository->findBy(['email' => $user->getEmail()]);

            if(sizeof($emailExists) > 0) {
                return $this->json(['error' => 'This e-mail is already registered.'], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
            }

            $userRepository->save($user);
            $token = $tokenRepository->create($user);
            
            return new JsonResponse(
                $tokenSerializer->serialize($token),
                JsonResponse::HTTP_OK,
                [],
                true
            );
    }
}